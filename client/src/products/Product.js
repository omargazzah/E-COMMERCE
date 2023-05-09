import { Link } from "react-router-dom";

// import { GET_EVENTS, GET_ERRORS } from "./";

// export const getEventsList = () => (dispatch) => {
//   axios
//     .get("localhost:8000/api/getallproduct")
//     .then((res) => {
//       dispatch({
//         type: GET_EVENTS,
//         payload: res.data.data,
//       });
//     })
//     .catch((err) => {
//       dispatch({
//         type: GET_ERRORS,
//       });
//       // console.log(err);
//     });
// };
export const since = (product) => {
  if (product?.createdAt) {
    const now = new Date();
    const seconds = now.getTime() / 1000 - Date.parse(product.createdAt) / 1000;
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);
    if (years > 0) {
      return `${years} years ago`;
    }
    if (months > 0) {
      return `${months} months ago`;
    }
    if (days > 1) {
      return `${days} days ago`;
    }
    if (days > 0) {
      return `${days} days ago`;
    }
    if (hours > 0) {
      return `${hours} hours ago`;
    }
    if (minutes > 0) {
      return `${minutes} minutes ago`;
    }
    if (seconds > 0) {
      return `${seconds} seconds ago`;
    }
  }
};

const Product = (props) => {
  return (
    <div className="col">
      <div className="card shadow-sm">
        <Link to={props.path} href="!#" replace>
          <img
            className="card-img-top bg-dark cover"
            height="200"
            alt=""
            src={props.data.image}
          />
        </Link>

        <div className="card-body">
          <h1 className="card-title text-center text-dark text-truncate">
            {props.data.name}
          </h1>
          <h5 className="card-title text-center text-grise text-truncate">
            {props.data.userName}
          </h5>
          <p className="card-text text-center text-muted mb-0">
            {props.data.price} DT/DAY
          </p>
          <p className="card-text text-center text-muted mb-0">
            {since(props.data)}
          </p>
          <div className="d-grid d-block">
            <button className="btn btn-outline-dark mt-3">Reserve</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
