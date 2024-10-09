import { useState, useEffect } from "react";
import { Dropdown, MenuProps } from "antd";

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
        <p style={{ cursor: "pointer" }} onClick={(e) => e.preventDefault()}>
          Profile
        </p>
      </Dropdown>
    </div>
  );
};

export default MoreBtn;
