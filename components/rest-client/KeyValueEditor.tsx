import { useClientStore } from '@/store/clientStore';
import { memo } from 'react';
import KeyValueRow from './KeyValueRow';
import { KeyValueProps } from '@/types/restClient';

const KeyValueEditor = memo(function KeyValueEditor() {
  const initial = useClientStore((store) => store.headers);
  const addHeader = useClientStore((store) => store.addHeader);
  const updateHeader = useClientStore((store) => store.updateHeader);

  const handleUpdate = (newHeader: KeyValueProps) => {
    if (newHeader.key || newHeader.value) {
      updateHeader(newHeader);
    }
  };

  const handleAdd = (newHeader: KeyValueProps) => {
    if (newHeader.key || newHeader.value) {
      addHeader(newHeader);
    }
  };

  const uuid = crypto.randomUUID();

  return (
    <>
      {initial.length > 0 &&
        initial.map((header) => (
          <KeyValueRow key={header.uuid} row={header} onChange={handleUpdate} />
        ))}
      <KeyValueRow
        key={uuid}
        row={{ uuid: uuid, key: '', value: '' }}
        onChange={handleAdd}
      />
    </>
  );
});

export default KeyValueEditor;
