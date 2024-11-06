import { ChangeEvent, FC, ReactNode, useEffect, useRef } from 'react';

interface FileUploadProps {
    onFileChange: (file: File | null) => void;
    file?: File
    children: ReactNode;
    className?: string
}

const FileUpload: FC<FileUploadProps> = ({ onFileChange, children,className, ...props }) => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleClick = () => {
        inputRef.current?.click();
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        onFileChange(file);
        if (inputRef.current) inputRef.current.value = ''; // очистка после выбора файла
    };

    useEffect(()=>{
        if(props.file)
        onFileChange(props.file);
    },[props.file])
    return (
        <>
            <input
                type="file"
                ref={inputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
            <div onClick={handleClick} /* style={{ display: 'inline-block' }} */ className={className}>
                {children}
            </div>
        </>
    );
};

export default FileUpload;
