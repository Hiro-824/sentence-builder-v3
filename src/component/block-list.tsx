import { Block } from '../grammar/block';
import BlockButton from './block-button';

interface BlockListProps {
    blocks: Block[];
    onBlockClick: (block: Block) => void;
}

const BlockList = ({ blocks, onBlockClick }: BlockListProps) => {

    const blockDefinitions = blocks.map((block, index) => ({
        ...block,
        id: index.toString(),
    }));

    return (
        <div
            style={{
                position: 'fixed',
                bottom: '0px',
                top: '0px',
                left: '0px',
                width: '12rem',
                backgroundColor: 'white',
                color: 'black',
                border: 'none',
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'auto',
                boxSizing: 'border-box',
                padding: 8,
            }}
        >
            {blockDefinitions.map((block) => {
                return BlockButton(block, (selectedBlockDefinition) => onBlockClick(selectedBlockDefinition));
            })}
        </div>
    );
};

export default BlockList;