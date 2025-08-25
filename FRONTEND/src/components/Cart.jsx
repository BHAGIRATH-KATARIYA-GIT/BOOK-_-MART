

const Cart = ({item}) => {
  return (
    <>
      <div className=" card bg-white text-black dark:text-white dark:bg-[#1E293B] md:w-80 md:m-5 shadow-sm h-100 md:mt-0 mt-14 hover:shadow-xl hover:scale-105 transition-transform duration-300">
        <figure className="relative top-[10px] ">
          <img
            src={item.image}
            alt="Shoes"
            width="200px"
            className=" rounded-2xl"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
           {item.title}
            <div className="badge badge-secondary">Free</div>
          </h2>
          <p>
            A card component has a figure, a body part, and inside body there
            are title and actions parts
          </p>
          <div className="card-actions justify-end">
            <div className="badge badge-outline cursor-pointer hover:bg-[#f43098] duration-500">Buy</div>
            <div className="badge badge-outline cursor-pointer hover:bg-[#f43098] duration-300">Read</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
