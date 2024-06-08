import { useEffect, useRef, useState } from "react";
import styles from "../css/SearchableDropdown.module.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const SearchableDropdown = ({
  options,
  label,
  id,
  selectedVal,
  onSearch,
  handleChange,
}) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    document.addEventListener("click", toggle);
    return () => document.removeEventListener("click", toggle);
    console.log(options);
  }, []);

  const selectOption = (option) => {
    setQuery(() => "");
    handleChange(option[label]);
    setIsOpen((isOpen) => !isOpen);
  };

  function toggle(e) {
    setIsOpen(e && e.target === inputRef.current);
  }

  const getDisplayValue = () => {
    if (query) return query;
    if (selectedVal) return selectedVal;

    return "";
  };

  const filter = (options) => {
    return options.filter(
      (option) => option[label].toLowerCase().indexOf(query.toLowerCase()) > -1
    );
  };

  return (
    <div className={styles.dropdown}>
      <div className={styles.control}>
        <div className={styles.selectedValue}>
          <SearchOutlinedIcon />
          <input
            ref={inputRef}
            type="text"
            value={getDisplayValue()}
            name="searchTerm"
            placeholder="Search..."
            onChange={(e) => {
              if (e.target.value.length > 3) {
                onSearch(e.target.value);
              }
              setQuery(e.target.value);
              handleChange(e.target.value);
            }}
            onClick={toggle}
            className={styles.dropdownInput}
          />
          <div className={`${styles.arrow} ${isOpen ? styles.open : ""}`}></div>
        </div>
      </div>

      <div className={`${styles.options} ${isOpen ? styles.open : ""}`}>
        {filter(options).map((option, index) => {
          return (
            <div
              onClick={() => selectOption(option)}
              className={`${styles.option} ${
                option[label] === selectedVal ? styles.selected : ""
              }`}
              key={`${id}-${index}`}
            >
              {option[label]}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchableDropdown;
