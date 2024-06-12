import Pagination from '@/Components/Pagination'
import SelectInput from '@/Components/SelectInput'
import TableHeading from '@/Components/TableHeading'
import TextInput from '@/Components/TextInput'
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from '@/constants'
import { Link, router } from '@inertiajs/react'
import React from 'react'

const TasksTable = ({ tasks, queryParams = null, sortChanged, searchFieldChange, hideTaskColumn = false }) => {
    queryParams = queryParams || {}


    const handleDeleteTask = (task) => {
        // if (!window.confirm('Are you sure you want to delete this project?')) {
        //     return;
        // }

        router.delete(route('task.destroy', task))
    }
    return (
        <>
            <div className='overflow-x-auto'>
                <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
                    <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500'>
                        <tr className='text-nowrap'>
                            <TableHeading name={'id'}
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                                sortChanged={sortChanged}
                            >
                                ID
                            </TableHeading>
                            <th>
                                Image
                            </th>
                            {!hideTaskColumn && <th>
                                Task Name
                            </th>}
                            <TableHeading name={'name'}
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                                sortChanged={sortChanged}
                            >
                                Priject Name
                            </TableHeading>
                            <TableHeading name={'status'}
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                                sortChanged={sortChanged}
                            >
                                Status
                            </TableHeading>
                            <TableHeading name={'created_at'}
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                                sortChanged={sortChanged}
                            >
                                Create Date
                            </TableHeading>
                            <TableHeading name={'due_date'}
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                                sortChanged={sortChanged}
                            >
                                Due Date
                            </TableHeading>
                            <TableHeading>
                                Created By
                            </TableHeading>
                            <TableHeading>
                                Actions
                            </TableHeading>
                        </tr>
                    </thead>
                    <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500'>
                        <tr className='text-nowrap'>
                            <th className='px-3 py-3'></th>
                            <th className='px-3 py-3'></th>
                            {!hideTaskColumn && <th className='px-3 py-3'></th>}
                            <th className='px-3 py-3'>
                                <TextInput
                                    className='w-full'
                                    defaultValue={queryParams.name}

                                    placeholder='Task Name'
                                    onBlur={(e) => searchFieldChange('name', e.target.value)}
                                    onKeyPress={(e) => onKeyPress('name', e)}
                                />
                            </th>
                            <th className='px-3 py-3'>
                                <SelectInput
                                    defaultValue={queryParams.status}
                                    className='w-full'
                                    onChange={(e) => searchFieldChange('status', e.target.value)}
                                >
                                    <option value=''>Select Status</option>
                                    <option value='pending'>Pending</option>
                                    <option value='in_progress'>In Progress</option>
                                    <option value='completed'>Completed</option>
                                </SelectInput>
                            </th>
                            <th className='px-3 py-3'></th>
                            <th className='px-3 py-3'></th>
                            <th className='px-3 py-3'></th>
                            <th className='px-3 py-3 text-right'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.data.map(task => (
                            <tr key={task.id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                                <th className='px-3 py-2'>{task.id}</th>
                                <td className='px-3 py-2'>
                                    <img src={task.image_path} alt='image' style={{ maxWidth: '60px', width: '100%' }} />
                                </td>
                                {!hideTaskColumn && <td className='px-3 py-2'>{task.project.name}</td>}
                                <td className='px-3 py-2'>{task.name}</td>
                                <td className='px-3 py-2'>
                                    <span className={`px-2 py-1 rounded text-white ${TASK_STATUS_CLASS_MAP[task.status]}`}>
                                        {TASK_STATUS_TEXT_MAP[task.status]}
                                    </span>
                                </td>
                                <td className='px-3 py-2 text-nowrap'>{task.created_at}</td>
                                <td className='px-3 py-2 text-nowrap'>{task.due_date}</td>
                                <td className='px-3 py-2'>{task.createdBy.name}</td>
                                <td className='px-3 py-2'>
                                    <Link href={route('task.edit', task.id)} className='font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1'>Edit</Link>
                                    <button onClick={() => handleDeleteTask(task)} className='font-medium text-red-600 dark:text-red-500 hover:underline mx-1'>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Pagination links={tasks.meta.links} />
        </>
    )
}

export default TasksTable