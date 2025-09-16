import { KeyValueProps } from '@/types/restClient';
import { TextField } from '@mui/material';
import { memo, useState } from 'react';

const KeyValueRow = memo(function KeyValueEditor({
  row,
  onChange,
}: {
  row: KeyValueProps;
  onChange: (_row: KeyValueProps) => void;
}) {
  const { uuid, key, value } = row;
  const [rowKey, setRowKey] = useState(key);
  const [rowValue, setRowValue] = useState(value);

  return (
    <div key={uuid} style={{ display: 'flex', marginBottom: '8px' }}>
      {/* <TextField type="checkbox" id="isActive" defaultChecked={isActive} /> */}
      <TextField
        key={`${key}-key`}
        type="text"
        id="keyInput"
        placeholder="header"
        value={rowKey}
        onChange={(e) => setRowKey(e.target.value.trim())}
        onBlur={() => onChange({ uuid, key: rowKey, value: rowValue })}
      />
      <TextField
        key={`${key}-value`}
        type="text"
        id="valueInput"
        placeholder="value"
        value={rowValue}
        onChange={(e) => setRowValue(e.target.value.trim())}
        onBlur={() => onChange({ uuid, key: rowKey, value: rowValue })}
      />
    </div>
  );
});

export default KeyValueRow;
