import PostDetail from '@/components/post/PostDetail';

// Zidt 'async' hna
export default async function PostPage({ params }) {
  // Zidt 'await' hna bach n-extraire l 'id'
  const { id } = await params;
  
  return <PostDetail postId={id} />;
}