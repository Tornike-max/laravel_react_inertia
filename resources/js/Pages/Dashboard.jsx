import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from '@/constants';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth, myPendingTasks, totalPendingTasks, totalProgressingTasks, myProgressingTasks, totalCompletedTasks, myCompletedTasks, activeTasks }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-1 px-4  sm:grid-cols-2 md:grid-cols-3 gap-2">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className='text-amber-600 text-2xl font-semibold'>Pending Tasks</h3>
                            <p className='text-xl mt-4'>
                                <span className='mr-2'>{myPendingTasks}</span>/
                                <span className='ml-2'>{totalPendingTasks}</span>
                            </p>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className='text-blue-600 text-2xl font-semibold'>Total Progressing Tasks</h3>
                            <p className='text-xl mt-4'>
                                <span className='mr-2'>{myProgressingTasks}</span>/
                                <span className='ml-2'>{totalProgressingTasks}</span>
                            </p>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className='text-green-600 text-2xl font-semibold'>Total Completed Tasks</h3>
                            <p className='text-xl mt-4'>
                                <span className='mr-2'>{myCompletedTasks}</span>/
                                <span className='ml-2'>{totalCompletedTasks}</span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100 ">
                            <h3 className='text-gray-200 text-xl font-semibold'>
                                My Active Tasks
                            </h3>
                            <div className='overflow-x-auto'>
                                <table className='w-full mt-4 text-sm text-left rtl:text-rigth text-gray-500 
                            dark:text-gray-400 overflow-x-auto'>
                                    <thead className='text-xs text-gray-700 uppercase bg-gray-50 
                                dark:bg-gray-700 dark:text-gray-400 border-b-2
                                 border-gray-500'>
                                        <tr>
                                            <th className='px-3 py-2'>Id</th>
                                            <th className='px-3 py-2'>Project Name</th>
                                            <th className='px-3 py-2'>Name</th>
                                            <th className='px-3 py-2'>Status</th>
                                            <th className='px-3 py-2'>Due Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {activeTasks.data.map(task => (
                                            <tr key={task.id}>
                                                <td className='px-3 py-2'>{task.id}</td>
                                                <td className='px-3 py-2'>
                                                    <Link className='hover:underline' href={route('project.show', task.project)}>
                                                        {task.project.name}
                                                    </Link>
                                                </td>
                                                <td className='px-3 py-2 text-nowrap'>{task.name}</td>
                                                <td className='px-3 py-2 text-nowrap'>
                                                    <span className={`px-2 py-1 rounded text-white ${TASK_STATUS_CLASS_MAP[task.status]}`}>
                                                        {TASK_STATUS_TEXT_MAP[task.status]}
                                                    </span>
                                                </td>
                                                <td className='px-3 py-2 text-nowrap'>{task.due_date}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout >
    );
}
