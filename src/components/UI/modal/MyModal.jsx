import classes from "./MyModal.module.css";

function MyModal({ children, visible, setVisible }) {
  const rootClasses = [classes.myModal];
  if (visible) {
    rootClasses.push(classes.active);
  }

  return (
    <div className={rootClasses.join(" ")} onClick={() => setVisible(false)}>
      <div
        className={classes.myModalContent}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export default MyModal;
