import * as React from 'react';
import { Typography } from 'antd';
import { useState } from 'react';
import { Verse } from '../Hooks/useBible';

const { Paragraph, Text } = Typography;

interface IVersProps {
    vers: Verse
}

const VersDisplay: React.FunctionComponent<IVersProps> = ({ vers }) => {
    const [marked, setMarked] = useState(false);


    return <Paragraph onClick={() => setMarked(!marked)} style={{ backgroundColor: marked ? "red" : "transparent" }}>
        <Text strong>{vers.number}.</Text>
        {vers.content}
    </Paragraph>;
};

export default VersDisplay;
