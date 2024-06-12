import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { USER_STATUS_CLASS_MAP, USER_STATUS_TEXT_MAP } from '@/constants'
import { Head } from '@inertiajs/react'
import React from 'react'
import TasksTable from '../Task/TasksTable'

const Show = ({ auth, user, tasks, queryParams }) => {

    console.log(tasks)
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    {`User ${user.name}`}
                </h2>
            }
        >
            <Head title={`User ${user.name}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className='bg-white dark:bg-gray-800 shadow sm:rounded-lg'>
                        <div className='text-gray-900 dark:text-gray-100 pb-4 w-full'>
                            <img src={user.image_path} alt='image' className='w-full h-64 object-cover rounded-md' />
                        </div>
                        <div className="p-4 sm:p-8 ">
                            <div className='grid gap-1 grid-cols-2'>
                                <div className='text-gray-900 dark:text-gray-100'>
                                    <div>
                                        <label className='font-bold text-lg'>User ID</label>
                                        <p className='mt-1'>{user.id}</p>
                                    </div>
                                    <div className='mt-4'>
                                        <label className='font-bold text-lg'>User Name</label>
                                        <p className='mt-1'>{user.name}</p>
                                    </div>
                                    <div className='mt-4'>
                                        <label className='font-bold text-lg'>Status</label>
                                        <p className='mt-1'>
                                            <span className={`px-2 py-1 rounded text-white ${USER_STATUS_CLASS_MAP[user.status]}`}>
                                                {USER_STATUS_TEXT_MAP[user.status]}
                                            </span>
                                        </p>
                                    </div>
                                    <div className='mt-4'>
                                        <label className='font-bold text-lg'>Updated By</label>
                                        <p className='mt-1'>{user.createdBy.name}</p>
                                    </div>
                                </div>
                                <div className='text-gray-900 dark:text-gray-100'>
                                    <div>
                                        <label className='font-bold text-lg'>Due Date</label>
                                        <p className='mt-1'>{user.due_date}</p>
                                    </div>
                                    <div className='mt-4'>
                                        <label className='font-bold text-lg'>Create Date</label>
                                        <p className='mt-1'>{user.created_at}</p>
                                    </div>
                                    <div className='mt-4'>
                                        <label className='font-bold text-lg'>Updated By</label>
                                        <p className='mt-1'>{user.updatedBy.name}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='w-full mt-4 text-gray-900 dark:text-gray-100'>
                                <label className='font-bold text-lg'>Description</label>
                                <p>{user.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="pb-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <TasksTable
                                tasks={tasks}
                                queryParams={queryParams}
                            />
                        </div>
                    </div>
                </div>
            </div>


        </AuthenticatedLayout >
    )
}

export default Show