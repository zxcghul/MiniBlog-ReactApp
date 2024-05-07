import PostItem from "./PostItem";
import { CSSTransition, TransitionGroup } from "react-transition-group";

function PostList({ posts, title, remove }) {
  if (posts.lenght == 0) {
    return <h1 style={{ textAlign: "center" }}>Постов не найдено!</h1>;
  }
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>{title}</h1>
      <TransitionGroup>
        {posts.map((post, index) => (
          <CSSTransition key={post.id} timeout={500} classNames="post">
            <PostItem remove={remove} num={index + 1} post={post} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
}

export default PostList;
