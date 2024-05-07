import PostService from "./API/PostService";
import PostFilter from "./components/PostFilter";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import Loader from "./components/UI/loader/loader";
import MyModal from "./components/UI/modal/MyModal";
import { usePosts } from "./hooks/uesPost";
import { useFetching } from "./hooks/useFetching";

import "./styles/App.css";
import React, { useEffect, useMemo, useState } from "react";
import { getPageArray, getPageCount } from "./utils/pages";

function App() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: "", query: "" });
  const [modal, setModal] = useState(false);
  const sortedAndSearchedPost = usePosts(posts, filter.sort, filter.query);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  let pagesArray = getPageArray(totalPages);
  console.log(pagesArray);
  const [fetchPosts, isLoad, postError] = useFetching(async () => {
    const response = await PostService.getAll(limit, page);
    setPosts(response.data);
    const totalCount = response.headers["x-total-count"];
    setTotalPages(getPageCount(totalCount, limit));
  });
  useEffect(() => {
    fetchPosts();
  }, [page]);

  function createPost(newPost) {
    setPosts([...posts, newPost]);
    setModal(false);
  }

  function changePage(page) {
    setPage(page);
  }


  function removePost(post) {
    setPosts(posts.filter((p) => p.id !== post.id));
  }

  return (
    <div className="App">
      <MyButton style={{ marginTop: "30px" }} onClick={() => setModal(true)}>
        Создать пост
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>

      <hr style={{ margin: "15px 0" }} />
      <PostFilter filter={filter} setFilter={setFilter} />
      {postError && <h1>Произошла ошибка ${postError}</h1>}
      {isLoad ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "50px",
          }}
        >
          <Loader />
        </div>
      ) : (
        <PostList
          remove={removePost}
          posts={sortedAndSearchedPost}
          title="Список постов 1"
        />
      )}
      <div className="page__wrp">
        {pagesArray.map((p) => (
          <span
            key={p}
            className={page === p ? "page page__current" : "page"}
            onClick={() => changePage(p)}
          >
            {p}
          </span>
        ))}
      </div>
    </div>
  );
}

export default App;
