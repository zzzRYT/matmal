import { useState, useEffect } from 'react';
import SettingItem from './SettingItem';

function Version() {
  const [version, setVersion] = useState('');

  useEffect(() => {
    const getVersion = async () => {
      const appVersion = await window.api.getAppVersion();
      setVersion(appVersion);
    };

    getVersion();
  }, []);

  return (
    <SettingItem title="현재 버전">
      <span className="text-base text-gray-600 dark:text-gray-300">{version}</span>
    </SettingItem>
  );
}

export default Version;
