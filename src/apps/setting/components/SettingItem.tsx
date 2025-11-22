import clsx from 'clsx';

interface SettingItemProps {
  title: string;
  description?: string;
  options?: 'horizontal' | 'vertical';
  children: React.ReactNode;
}

function SettingItem({ title, description, options = 'horizontal', children }: SettingItemProps) {
  const isHorizontal = clsx({
    'flex justify-between items-center': options === 'horizontal',
    'flex flex-col': options === 'vertical',
  });

  return (
    <div className={isHorizontal + ' py-3 border-b border-gray-200 dark:border-gray-700'}>
      <div>
        <h3 className="text-base font-medium text-gray-900 dark:text-gray-100">{title}</h3>
        {description && <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>}
      </div>
      <div className="my-2">{children}</div>
    </div>
  );
}

export default SettingItem;
