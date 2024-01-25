import * as React from 'react';
import { Typography } from 'antd';
import { useState } from 'react';
import { Verse } from '../Hooks/types';

const { Paragraph, Text } = Typography;

interface IVersProps {
    vers: Verse
}

const VersDisplay: React.FunctionComponent<IVersProps> = ({ vers }) => {
    const [marked, setMarked] = useState(false);
    const style: Partial<React.CSSProperties> = {
        backgroundColor: marked ? "black" : "transparent",
        color: marked ? "white" : "black"
    }

    return <Paragraph onClick={() => setMarked(!marked)} style={style}>
        <Text strong>{vers.number}.</Text>
        {vers.content}
    </Paragraph>;
};

export default VersDisplay;
