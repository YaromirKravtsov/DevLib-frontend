import { useState, useRef, useEffect, FC } from "react";
import styles from "./MySelect.module.css";
import arrowSelect from "../../assets/images/arrow-down-s-fill.svg";

export interface SelectOption {
    value: string;
    label: string;
}

interface MySelectProps {
    options: SelectOption[];
    placeholder?: string;
    className?: string;
    onChange: (value: string) => void;
    disabled?: boolean;
    value?: string; // Проп для начального значения
    hasError?: boolean; // Новое свойство для отображения ошибки
}

const MySelect: FC<MySelectProps> = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState<string | null>(props.value || null);
    const selectRef = useRef<HTMLDivElement>(null);
    const selectedOptionRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (props.value !== undefined) {
            setSelectedValue(props.value); // Устанавливаем начальное значение
        }
    }, [props.value]);

    const handleOptionClick = (value: string) => {
        setSelectedValue(value);
        props.onChange(value);
        setIsOpen(false);
    };

    const toggleDropdown = () => {
        if (!props.disabled) {
            setIsOpen((prevState) => !prevState);
        }
    };

    // Прокручиваем к выбранному элементу, когда выпадающий список открывается
    useEffect(() => {
        if (isOpen && selectedOptionRef.current) {
            selectedOptionRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
    }, [isOpen]);

    const handleClickOutside = (event: MouseEvent) => {
        if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div
            className={`${props.className || ""} ${styles.customSelectContainer} ${
                props.disabled ? styles.disabled : ""
            } ${props.hasError ? styles.errorBorder : ""}`} // Добавляем класс ошибки, если hasError true
            ref={selectRef}
        >
            <div
                className={styles.customSelectTrigger}
                onClick={toggleDropdown}
                style={{ cursor: props.disabled ? "not-allowed" : "pointer" }}
            >
                <span className={selectedValue ? styles.selectedPlaceholder : ""}>
                    {selectedValue
                        ? props.options.find((option) => option.value === selectedValue)?.label
                        : props.placeholder}
                </span>
                <img
                    src={arrowSelect}
                    alt="arrow select"
                    className={`${styles.arrow} ${isOpen ? styles.open : ""}`}
                />
            </div>
            {isOpen && !props.disabled && (
                <div className={styles.customSelectDropdown}>
                    {props.options.map((option) => (
                        <div
                            key={option.value}
                            ref={option.value === selectedValue ? selectedOptionRef : null}
                            className={`${styles.customSelectOption} ${
                                option.value === selectedValue ? styles.selectedOption : ""
                            }`}
                            onClick={() => handleOptionClick(option.value)}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
            {props.hasError && (
                <span className={styles.errorText}>Eingabefehler. Bitte überprüfen Sie die Daten.</span>
            )}
        </div>
    );
};

export default MySelect;
