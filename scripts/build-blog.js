import fs from 'fs/promises';
import path from 'path';
import { marked } from 'marked';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const POSTS_DIR = path.join(__dirname, '..', 'posts');
const POSTS_MD_DIR = path.join(POSTS_DIR, 'markdown');
const POSTS_HTML_DIR = path.join(POSTS_DIR, 'html');
const POSTS_INDEX_FILE = path.join(POSTS_DIR, 'index.json');

// ディレクトリを作成
async function ensureDirectories() {
  await fs.mkdir(POSTS_DIR, { recursive: true });
  await fs.mkdir(POSTS_MD_DIR, { recursive: true });
  await fs.mkdir(POSTS_HTML_DIR, { recursive: true });
}

// Markdownファイルを処理
async function processMarkdownFile(filename) {
  const filePath = path.join(POSTS_MD_DIR, filename);
  const content = await fs.readFile(filePath, 'utf-8');
  const { data, content: markdownContent } = matter(content);
  
  const slug = filename.replace(/\.md$/, '');
  const htmlContent = await marked(markdownContent);
  
  // HTMLファイルを生成
  const htmlPath = path.join(POSTS_HTML_DIR, `${slug}.html`);
  await fs.writeFile(htmlPath, htmlContent);
  
  return {
    slug,
    title: data.title || slug,
    date: data.date || new Date().toISOString(),
    excerpt: data.excerpt || '',
    tags: data.tags || [],
    author: data.author || '',
    htmlFile: `${slug}.html`
  };
}

// 全てのMarkdownファイルを処理
async function buildBlog() {
  try {
    console.log('Building blog posts...');
    
    await ensureDirectories();
    
    // Markdownファイルを取得
    const files = await fs.readdir(POSTS_MD_DIR);
    const mdFiles = files.filter(file => file.endsWith('.md'));
    
    if (mdFiles.length === 0) {
      console.log('No markdown files found in posts/markdown/');
      // 空のインデックスを作成
      await fs.writeFile(POSTS_INDEX_FILE, JSON.stringify([], null, 2));
      return;
    }
    
    // 各ファイルを処理
    const posts = await Promise.all(
      mdFiles.map(file => processMarkdownFile(file))
    );
    
    // 日付でソート（新しい順）
    posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    // インデックスファイルを生成
    await fs.writeFile(POSTS_INDEX_FILE, JSON.stringify(posts, null, 2));
    
    console.log(`Built ${posts.length} blog posts successfully!`);
  } catch (error) {
    console.error('Error building blog:', error);
    process.exit(1);
  }
}

buildBlog();