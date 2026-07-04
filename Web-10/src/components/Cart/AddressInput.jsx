import {useContext} from "react";
import {CartContext} from "../../context/CartContext";

const AddressInput = () => {
  const {address, setAddress} = useContext(CartContext);

  return (
    <div className="address-input">
      <label>Адрес доставки:</label>
      <input
        type="text" value={address} placeholder="пр. Московский, д. 33"
        onChange={(event) => setAddress(event.target.value)}
      />
    </div>
  );
};

export default AddressInput;
