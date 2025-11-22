import ThemeSettings from './Theme';
import Version from './Version';

function Setting() {
  return (
    <div className="p-4 h-screen bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 overflow-auto">
      <h2 className="text-xl font-bold mb-4">설정</h2>

      <ThemeSettings />

      <Version />
    </div>
  );
}

export default Setting;
