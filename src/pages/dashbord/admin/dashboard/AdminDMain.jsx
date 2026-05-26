import React from 'react'
import { useSelector } from 'react-redux';
import { useGetAdminStatsQuery } from '../../../../redux/features/stats/statsApi';
import AdminStats from './AdminStats';
import AdminStatsChart from './AdminStatsChart';

const AdminDMain = () => {
    const {user} = useSelector((state) => state.auth);
    const {data: stats, error, isLoading} = useGetAdminStatsQuery();
    if(isLoading) return <div>جاري التحميل...</div>
    if(!stats) return <div>لم يتم العثور على أي إحصائيات</div>
    if(error) return <div>فشل تحميل الإحصائيات!</div>
  return (
    <div className='p-6'>
        <div>
            <h1 className='text-2xl font-semibold mb-4'>لوحة تحكم المشرف</h1>
            <p className='text-gray-500'>{user?.username}!مرحبًا بك في لوحة تحكم الإدارة.</p>
            <AdminStats stats={stats}/>
            <AdminStatsChart stats={stats}/>
        </div>
    </div>
  )
}

export default AdminDMain