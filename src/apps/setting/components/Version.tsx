import SettingItem from './SettingItem';

function Version() {
  return (
    <SettingItem title="현재 버전">
      <span className="text-base text-gray-600 dark:text-gray-300">{'1.0.0'}</span>
    </SettingItem>
  );
}

export default Version;
