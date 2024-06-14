import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { TASK_PRIORITY_CLASS_MAP, TASK_PRIORITY_TEXT_MAP, TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from '@/constants'
import { Head, Link } from '@inertiajs/react'
import React from 'react'
import TasksTable from '../Task/TasksTable'

const Show = ({ auth, task }) => {

    console.log(task)
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    {`Task ${task.name}`}
                </h2>
            }
        >
            <Head title={`Task ${task.name}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className='bg-white dark:bg-gray-800 shadow sm:rounded-lg'>
                        <div className='text-gray-900 dark:text-gray-100 pb-4 w-full'>
                            <img src={task.image_path} alt='image' className='w-full h-64 object-cover rounded-md' />
                        </div>
                        <div className="p-4 sm:p-8 ">
                            <div className='grid gap-1 grid-cols-2'>
                                <div className='text-gray-900 dark:text-gray-100'>
                                    <div>
                                        <label className='font-bold text-lg'>Task ID</label>
                                        <p className='mt-1'>{task.id}</p>
                                    </div>
                                    <div className='mt-4'>
                                        <label className='font-bold text-lg'>Task Name</label>
                                        <p className='mt-1'>{task.name}</p>
                                    </div>
                                    <div className='mt-4'>
                                        <label className='font-bold text-lg'>Priority</label>
                                        <p className='mt-1'>
                                            <span className={`px-2 py-1 rounded text-white ${TASK_PRIORITY_CLASS_MAP[task.priority]}`}>
                                                {TASK_PRIORITY_TEXT_MAP[task.priority]}
                                            </span>
                                        </p>
                                    </div>
                                    <div className='mt-4'>
                                        <label className='font-bold text-lg'>Status</label>
                                        <p className='mt-1'>
                                            <span className={`px-2 py-1 rounded text-white ${TASK_STATUS_CLASS_MAP[task.status]}`}>
                                                {TASK_STATUS_TEXT_MAP[task.status]}
                                            </span>
                                        </p>
                                    </div>
                                    <div className='mt-4'>
                                        <label className='font-bold text-lg'>Updated By</label>
                                        <p className='mt-1'>{task.createdBy.name}</p>
                                    </div>
                                </div>
                                <div className='text-gray-900 dark:text-gray-100'>
                                    <div>
                                        <label className='font-bold text-lg'>Due Date</label>
                                        <p className='mt-1'>{task.due_date}</p>
                                    </div>
                                    <div className='mt-4'>
                                        <label className='font-bold text-lg'>Create Date</label>
                                        <p className='mt-1'>{task.created_at}</p>
                                    </div>
                                    <div className='mt-4'>
                                        <label className='font-bold text-lg'>Updated By</label>
                                        <p className='mt-1'>{task.updatedBy.name}</p>
                                    </div>
                                    <div className='mt-4'>
                                        <label className='font-bold text-lg'>Project Name</label>
                                        <p className='mt-1'>
                                            <Link className='hover:underline' href={route('project.show', task.project.id)}>
                                                {task.project.name}
                                            </Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className='w-full mt-4 text-gray-900 dark:text-gray-100'>
                                <label className='font-bold text-lg'>Description</label>
                                <p>{task.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout >
    )
}

export default Show