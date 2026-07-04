import {formatMoney} from "../../utils/utils";

const TotalCost = ({totalCost}) => {
  return (
    <div className="cart-total">
      <strong>Общая сумма: {formatMoney(totalCost)} BYN</strong>
    </div>
  );
};

export default TotalCost;
