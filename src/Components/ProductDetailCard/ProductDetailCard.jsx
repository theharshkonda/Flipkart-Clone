import React from "react";
import PropTypes from "prop-types";
import "./ProductDetailCard.css";

const ProductDetailCard = ({ Data }) => {
  // Check if Data is available and has required properties
  if (!Data) {
    return <div>No product data available</div>;
  }

  const {
    url,
    Product,
    rating,
    reviews,
    Description,
    Display,
    Camera,
    Processor,
    Sellingprice,
  } = Data;

  return (
    <div className="ProductDetailCard">
      <div className="ProductDetailCard-Img">
        <img src={url} alt={Product} />
      </div>
      <div className="ProductDetailCard-details">
        <p className="ProductDetailCard-name">{Product}</p>
        <div className="ratingsAndreviews">
          <div className="stars">{rating} ◈</div>
          <p className="ratings">
            {rating} Ratings & {reviews} Reviews
          </p>
        </div>
        <div className="ProductDetailCard-Productdetails">
          <ul>
            <li className="ProductDetailCard-detail">{Description}</li>
            <li className="ProductDetailCard-detail">{Display}</li>
            <li className="ProductDetailCard-detail">{Camera}</li>
            <li className="ProductDetailCard-detail">{Processor}</li>
          </ul>
        </div>
      </div>

      <div className="ProductDetailCard-PriceandDelivery">
        <div className="pricecontainer">
          <p className="ProductDetailCard-price">{Sellingprice}</p>
          <img
            src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png"
            height={21}
            alt="Discount tag"
          />
        </div>
        <p className="freedel">Free delivery</p>
        <p className="discount">
          Upto <b>17,500</b> off on Exchange No Cost EMI from 23,317/month
        </p>
      </div>
    </div>
  );
};

ProductDetailCard.propTypes = {
  Data: PropTypes.shape({
    url: PropTypes.string.isRequired,
    Product: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    reviews: PropTypes.number.isRequired,
    Description: PropTypes.string.isRequired,
    Display: PropTypes.string.isRequired,
    Camera: PropTypes.string.isRequired,
    Processor: PropTypes.string.isRequired,
    Sellingprice: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductDetailCard;
