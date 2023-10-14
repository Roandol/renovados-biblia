import * as React from 'react';
import { Typography } from 'antd';
import { Cap, Verse } from '../Hooks/useBible';
import VersDisplay from './VersDisplay';


const CapDisplay: React.FunctionComponent<ICapProps> = ({ cap, verses }) => {
    const verss = verses ? verses.map(transfomVerse) : cap.verses.map(transfomVerse);

    return <>
        <Title className='pagina__capitulo'>{cap.number}</Title>
        <div className='pagina__versiculos'>
            {verss}
        </div>
    </>;
};

export default CapDisplay;
