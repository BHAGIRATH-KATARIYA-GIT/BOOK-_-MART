const NotesCart = ({ item }) => {
  // console.log(item);

  return (
    <div>
      <div className="card bg-base-100 md:w-64 w-72 shadow-sm">
        <div className="card-body">
          <h2 className="card-title">{item.subject}</h2>
          <p>{item.description}</p>
          <div className="card-actions justify-end">
            <button
              className="btn btn-primary"
              onClick={() =>
                window.open(
                  `${item.link}`,
                  "_blank"
                )
              }
            >
              View
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotesCart;
