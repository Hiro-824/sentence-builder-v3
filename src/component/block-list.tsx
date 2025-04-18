import React from 'react';
import { Block } from '../grammar/block';
import BlockButton from './block-button';

interface BlockListProps {
  blocks: Record<string, Block[]>;
  onBlockClick: (block: Block) => void;
}

const BlockList = ({ blocks, onBlockClick }: BlockListProps) => {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        top: 0,
        left: 0,
        width: '12rem',
        backgroundColor: 'rgba(249, 249, 249, 0.5)',
        color: 'black',
        borderRight: '1px solid gainsboro',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        boxSizing: 'border-box',
        padding: 8,
        paddingBottom: 400,
      }}
    >
      {Object.entries(blocks).map(([groupName, blockArray], groupIndex) => (
        <div key={groupName} style={{ marginBottom: '1rem' }}>
          {/* Group header */}
          <div
            style={{
              fontWeight: 'bold',
              marginBottom: '0.5rem',
            }}
          >
            {groupName}
          </div>

          {/* Buttons for this group */}
          {blockArray.map((block, idx) => (
            <div key={`${groupName}-${idx}`} style={{ marginBottom: '0.25rem' }}>
              {BlockButton({
                ...block,
                id: `${groupIndex}-${idx}`,
              },
              (selected) => onBlockClick(selected))}
            </div>
          ))}

          {/* Divider except after last group */}
          {groupIndex < Object.keys(blocks).length - 1 && (
            <hr style={{ borderColor: 'gainsboro', margin: '1rem 0' }} />
          )}
        </div>
      ))}
    </div>
  );
};

export default BlockList;
