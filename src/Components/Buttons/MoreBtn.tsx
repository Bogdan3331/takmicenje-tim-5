import { useState, useEffect } from "react";
import { Dropdown, MenuProps } from "antd";

interface MoreBtnProp {
  items: MenuProps["items"];
}

const MoreBtn: React.FC<MoreBtnProp> = ({ items }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleResize = () => {
    setDropdownOpen(false);
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
        open={dropdownOpen}
        onOpenChange={(flag) => setDropdownOpen(flag)}
      >
        <p style={{ cursor: "pointer" }} onClick={(e) => e.preventDefault()}>
          Profile
        </p>
      </Dropdown>
    </div>
  );
};

export default MoreBtn;
