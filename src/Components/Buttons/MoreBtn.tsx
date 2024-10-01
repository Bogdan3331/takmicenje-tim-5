import { useState, useEffect } from "react";
import { Dropdown, MenuProps } from "antd";
import "bootstrap-icons/font/bootstrap-icons.css";

interface MoreBtnProp {
  items: MenuProps["items"];
}

const MoreBtn: React.FC<MoreBtnProp> = ({ items }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleResize = () => {
    setDropdownVisible(false);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <Dropdown
        menu={{ items }}
        trigger={["click"]}
        visible={dropdownVisible}
        onVisibleChange={(flag) => setDropdownVisible(flag)}
      >
        <p onClick={(e) => e.preventDefault()}>
          <i
            className="bi bi-three-dots-vertical"
            style={{ cursor: "pointer" }}
          ></i>
        </p>
      </Dropdown>
    </div>
  );
};

export default MoreBtn;
