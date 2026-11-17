import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface Post {
  id: string;
  section: string;
  title: string;
  content: string;
  author: string;
  contactWechat?: string;
  contactEmail?: string;
  createdAt: string;
  replies: number;
  likes: number;
  views: number;
  likedBy?: string[];
  hot?: boolean;
  tags?: string[];
}

interface Comment {
  id: string;
  postId: string;
  author: string;
  content: string;
  createdAt: string;
  contactWechat?: string;
  contactEmail?: string;
  likes: number;
  likedBy?: string[];
}

const DATA_DIR = path.join(process.cwd(), 'data');
const POSTS_FILE = path.join(DATA_DIR, 'community-posts.json');
const COMMENTS_FILE = path.join(DATA_DIR, 'community-comments.json');

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(POSTS_FILE)) {
    fs.writeFileSync(POSTS_FILE, JSON.stringify([]));
  }
  if (!fs.existsSync(COMMENTS_FILE)) {
    fs.writeFileSync(COMMENTS_FILE, JSON.stringify([]));
  }
}

function readPosts(): Post[] {
  ensureDataDir();
  try {
    const content = fs.readFileSync(POSTS_FILE, 'utf-8');
    return JSON.parse(content);
  } catch {
    return [];
  }
}

function writePosts(posts: Post[]) {
  ensureDataDir();
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2));
}

function readComments(): Comment[] {
  ensureDataDir();
  try {
    const content = fs.readFileSync(COMMENTS_FILE, 'utf-8');
    return JSON.parse(content);
  } catch {
    return [];
  }
}

function writeComments(comments: Comment[]) {
  ensureDataDir();
  fs.writeFileSync(COMMENTS_FILE, JSON.stringify(comments, null, 2));
}

// 生成简单的用户标识（基于浏览器）
function getUserId(req: NextRequest): string {
  const ua = req.headers.get('user-agent') || 'unknown';
  const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
  let hash = 0;
  const str = `${ua}-${ip}`;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return `user_${Math.abs(hash)}`;
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const section = searchParams.get('section');
  const id = searchParams.get('id');
  const search = searchParams.get('search');
  const tag = searchParams.get('tag');
  const sort = searchParams.get('sort') || 'new';

  try {
    let posts = readPosts();

    // 按帖子 ID 查询单条
    if (id) {
      const post = posts.find((p) => p.id === id);
      if (post) {
        return NextResponse.json({ post });
      }
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    // 筛选板块
    if (section && section !== 'all') {
      posts = posts.filter((p) => p.section === section);
    }

    // 按标签筛选（精确匹配 slug；同时兼容老数据没有 tags 字段的情况）
    if (tag) {
      const targetTag = tag.toLowerCase();
      posts = posts.filter((p) => {
        if (p.tags && p.tags.length > 0) {
          return p.tags.some((t) => t.toLowerCase() === targetTag);
        }
        // 兼容：老数据没有 tags 时，从标题/内容里找是否出现过该标签名
        const tagNameToSearch = [targetTag];
        const blob = `${p.title} ${p.content}`.toLowerCase();
        return tagNameToSearch.some((t) => blob.includes(t));
      });
    }

    // 搜索
    if (search) {
      const q = search.toLowerCase();
      posts = posts.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.content.toLowerCase().includes(q) ||
          p.author.toLowerCase().includes(q) ||
          (p.tags && p.tags.some((t) => t.toLowerCase().includes(q)))
      );
    }

    // 排序
    if (sort === 'hot') {
      posts.sort((a, b) => b.likes - a.likes || b.replies - a.replies);
    } else if (sort === 'top') {
      posts.sort((a, b) => b.views - a.views);
    } else {
      posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    // 各板块计数
    const sections = ['operation', 'product-selection', 'qa', 'experience'];
    const allPosts = readPosts();
    const sectionCounts: Record<string, number> = {};
    sections.forEach((s) => {
      sectionCounts[s] = allPosts.filter((p) => p.section === s).length;
    });
    sectionCounts['all'] = allPosts.length;

    // 各标签计数（兼容：无 tags 时基于标题/内容匹配做个估算）
    const KNOWN_TAG_SLUGS = [
      'amazon', 'tiktok', 'shopee', 'lazada', 'ebay', 'mercado', 'ozon',
      'product-selection', 'ads', 'logistics', 'account', 'payment', 'seo',
      'compliance', 'experience', 'qa',
    ];
    const TAG_NAMES: Record<string, string[]> = {
      'amazon': ['amazon', '亚马逊'],
      'tiktok': ['tiktok'],
      'shopee': ['shopee', '虾皮'],
      'lazada': ['lazada', '来赞达'],
      'ebay': ['ebay', '易贝'],
      'mercado': ['mercado', '美客多'],
      'ozon': ['ozon'],
      'product-selection': ['选品'],
      'ads': ['广告', 'ads'],
      'logistics': ['物流'],
      'account': ['账号', '账户'],
      'payment': ['收款', '回款'],
      'seo': ['seo', '关键词'],
      'compliance': ['合规', '审核', '政策'],
      'experience': ['经验', '心得'],
      'qa': ['求助', '问答', '提问', '问题'],
    };
    const tagCounts: Record<string, number> = {};
    KNOWN_TAG_SLUGS.forEach((slug) => {
      tagCounts[slug] = allPosts.filter((p) => {
        if (p.tags && p.tags.length > 0) {
          return p.tags.some((t) => t.toLowerCase() === slug);
        }
        const blob = `${p.title} ${p.content}`.toLowerCase();
        return TAG_NAMES[slug]?.some((name) => blob.includes(name.toLowerCase()));
      }).length;
    });

    return NextResponse.json({ posts, sectionCounts, tagCounts });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to get posts' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, section, title, content, author, contactWechat, contactEmail, postId, targetId, tags } = body;

    // 点赞操作
    if (type === 'like') {
      const userId = getUserId(request);
      const posts = readPosts();
      const postIndex = posts.findIndex((p) => p.id === targetId);
      if (postIndex === -1) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
      }
      const likedBy = posts[postIndex].likedBy || [];
      if (likedBy.includes(userId)) {
        // 取消点赞
        posts[postIndex].likedBy = likedBy.filter((id) => id !== userId);
        posts[postIndex].likes = Math.max(0, posts[postIndex].likes - 1);
        writePosts(posts);
        return NextResponse.json({ success: true, liked: false, likes: posts[postIndex].likes });
      } else {
        posts[postIndex].likedBy = [...likedBy, userId];
        posts[postIndex].likes = posts[postIndex].likes + 1;
        writePosts(posts);
        return NextResponse.json({ success: true, liked: true, likes: posts[postIndex].likes });
      }
    }

    // 增加浏览量
    if (type === 'view') {
      const posts = readPosts();
      const postIndex = posts.findIndex((p) => p.id === targetId);
      if (postIndex === -1) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
      }
      posts[postIndex].views = (posts[postIndex].views || 0) + 1;
      writePosts(posts);
      return NextResponse.json({ success: true, views: posts[postIndex].views });
    }

    // 发布评论
    if (type === 'comment') {
      if (!postId || !content || !author) {
        return NextResponse.json({ error: 'Please fill in complete information' }, { status: 400 });
      }
      if (content.length < 2) {
        return NextResponse.json({ error: 'Comment content is too short' }, { status: 400 });
      }

      const posts = readPosts();
      const postIndex = posts.findIndex((p) => p.id === postId);
      if (postIndex === -1) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
      }

      const comments = readComments();
      const newComment: Comment = {
        id: `comment_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
        postId,
        author: author.trim(),
        content: content.trim(),
        createdAt: new Date().toISOString(),
        contactWechat: contactWechat?.trim() || undefined,
        contactEmail: contactEmail?.trim() || undefined,
        likes: 0,
      };
      comments.unshift(newComment);
      writeComments(comments);

      // 更新帖子回复数
      posts[postIndex].replies = posts[postIndex].replies + 1;
      writePosts(posts);

      return NextResponse.json({ comment: newComment, success: true });
    }

    // 获取评论
    if (type === 'getComments') {
      if (!postId) {
        return NextResponse.json({ error: 'Missing postId' }, { status: 400 });
      }
      const comments = readComments().filter((c) => c.postId === postId);
      comments.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      return NextResponse.json({ comments });
    }

    // 评论点赞
    if (type === 'likeComment') {
      const userId = getUserId(request);
      const comments = readComments();
      const commentIndex = comments.findIndex((c) => c.id === targetId);
      if (commentIndex === -1) {
        return NextResponse.json({ error: 'Comment not found' }, { status: 404 });
      }
      const likedBy = comments[commentIndex].likedBy || [];
      if (likedBy.includes(userId)) {
        // 取消点赞
        comments[commentIndex].likedBy = likedBy.filter((id) => id !== userId);
        comments[commentIndex].likes = Math.max(0, comments[commentIndex].likes - 1);
        writeComments(comments);
        return NextResponse.json({ success: true, liked: false, likes: comments[commentIndex].likes });
      } else {
        comments[commentIndex].likedBy = [...likedBy, userId];
        comments[commentIndex].likes = comments[commentIndex].likes + 1;
        writeComments(comments);
        return NextResponse.json({ success: true, liked: true, likes: comments[commentIndex].likes });
      }
    }

    // 发布新帖
    if (!section || !title || !content || !author) {
      return NextResponse.json({ error: 'Please fill in complete information (section, title, content, author)' }, { status: 400 });
    }

    if (title.length < 5) {
      return NextResponse.json({ error: 'Title must be at least 5 characters' }, { status: 400 });
    }
    if (content.length < 10) {
      return NextResponse.json({ error: 'Content must be at least 10 characters' }, { status: 400 });
    }

    const posts = readPosts();
    // 确保 tags 是合法的字符串数组（简单做下白名单过滤）
    const allowedTags = new Set([
      'amazon', 'tiktok', 'shopee', 'lazada', 'ebay', 'mercado', 'ozon',
      'product-selection', 'ads', 'logistics', 'account', 'payment', 'seo',
      'compliance', 'experience', 'qa',
    ]);
    const normalizedTags: string[] = Array.isArray(tags)
      ? tags
          .map((t: unknown) => String(t || '').trim().toLowerCase())
          .filter((t: string) => t && allowedTags.has(t))
      : [];

    const newPost: Post = {
      id: `post_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      section,
      title: title.trim(),
      content: content.trim(),
      author: author.trim(),
      contactWechat: contactWechat?.trim() || undefined,
      contactEmail: contactEmail?.trim() || undefined,
      createdAt: new Date().toISOString(),
      replies: 0,
      likes: 0,
      views: 0,
      tags: normalizedTags.length > 0 ? normalizedTags : undefined,
    };

    posts.unshift(newPost);
    writePosts(posts);

    return NextResponse.json({ post: newPost, success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Publish failed, please try again' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');
    const commentId = searchParams.get('commentId');

    // 删除评论
    if (commentId) {
      const comments = readComments();
      const comment = comments.find((c) => c.id === commentId);
      if (!comment) {
        return NextResponse.json({ error: 'Comment not found' }, { status: 404 });
      }

      const filteredComments = comments.filter((c) => c.id !== commentId);
      writeComments(filteredComments);

      // 更新帖子回复数
      const posts = readPosts();
      const postIndex = posts.findIndex((p) => p.id === comment.postId);
      if (postIndex !== -1) {
        posts[postIndex].replies = Math.max(0, posts[postIndex].replies - 1);
        writePosts(posts);
      }

      return NextResponse.json({ success: true });
    }

    // 删除帖子
    if (!id) {
      return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
    }

    const posts = readPosts();
    const postIndex = posts.findIndex((p) => p.id === id);
    if (postIndex === -1) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const filteredPosts = posts.filter((p) => p.id !== id);
    writePosts(filteredPosts);

    // 删除关联评论
    const comments = readComments();
    const filteredComments = comments.filter((c) => c.postId !== id);
    writeComments(filteredComments);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}