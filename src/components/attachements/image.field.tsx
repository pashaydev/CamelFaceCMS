import React from 'react';
import './styles/image.field.style.css';


type Props = {
    rowData: {
        id: string;
        publicUrl: string;
        originalName: string;
    };
};

export const ImageFieldList: React.FC<Props> = (props) => {
    const {
        rowData: { originalName, publicUrl },
    } = props;
    return (
        <div className="imageContainer">
            <img className="image" src={publicUrl} alt={originalName} />
        </div>
    );
};
