import Pagination from '@/Components/Pagination'
import SelectInput from '@/Components/SelectInput'
import TextInput from '@/Components/TextInput'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from '@/constants'
import { Head, Link, router } from '@inertiajs/react'
import React from 'react'
import TableHeading from '@/Components/TableHeading'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const Index = ({ auth, projects, queryParams = null, success }) => {
    const [message, setMessage] = useState(null)

    useEffect(() => {
        if (success) {
            setMessage(success)
            setTimeout(() => {
                setMessage(null)
            }, 3000)
        }
        return;
    }, [success])
    queryParams = queryParams || {}

    const searchFieldChange = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name]
        }
        router.get(route('project.index'), queryParams)
    }

    const onKeyPress = (name, e) => {
        if (e.key !== 'Enter') return;
        searchFieldChange(name, e.target.value)
    }

    const sortChanged = (name) => {
        if (name === queryParams.sort_field) {
            if (queryParams.sort_direction === 'asc') {
                queryParams.sort_direction = 'desc'
            } else {
                queryParams.sort_direction = 'asc'
            }
        } else {
            queryParams.sort_field = name
            queryParams.sort_direction = 'asc'
        }
        router.get(route('project.index'), queryParams)
    }

    const handleDeleteProject = (project) => {
        // if (!window.confirm('Are you sure you want to delete this project?')) {
        //     return;
        // }

        router.delete(route('project.destroy', project))
    }


    return (
        <AuthenticatedLayout user={auth.user}
            header={
                <div className='flex justify-between items-center'>
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Projects</h2>
                    <Link className='bg-emerald-500 hover:bg-emerald-600 py-1 px-3 text-white rounded shadow transition-all duration-150'
                        href={route('project.create')}>
                        Add New
                    </Link>
                </div>
            }
        >
            <Head title='Projects' />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {message &&
                        <motion.div variants={{
                            hidden: { opacity: 0, y: -75 },
                            visible: { opacity: 1, y: 0 },
                        }}
                            initial="hidden"
                            animate="visible"
                            transition={{
                                duration: 0.3,
                                delay: 0.2,
                            }} className='w-full py-2 px-4 bg-emerald-500 text-gray-100 text-md font-medium mb-4 rounded-md'>
                            {message}
                        </motion.div>
                    }
                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
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
                                        <TableHeading>
                                            Image
                                        </TableHeading>
                                        <TableHeading name={'name'}
                                            sort_field={queryParams.sort_field}
                                            sort_direction={queryParams.sort_direction}
                                            sortChanged={sortChanged}
                                        >
                                            Name
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
                                        <th className='px-3 py-3'>
                                            <TextInput
                                                className='w-full'
                                                defaultValue={queryParams.name}

                                                placeholder='Project Name'
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
                                    {projects.data.map(project => (
                                        <tr key={project.id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                                            <th className='px-3 py-2'>{project.id}</th>
                                            <td className='px-3 py-2'>
                                                <img src={project.image_path} alt='image' style={{ maxWidth: '60px', width: '100%' }} />
                                            </td>
                                            <td className='px-3 py-2 hover:underline hover:text-slate-100 duration-150 transition-all'>
                                                <Link href={route('project.show', project.id)}>
                                                    {project.name}
                                                </Link>
                                            </td>
                                            <td className='px-3 py-2'>
                                                <span className={`px-2 py-1 rounded text-white ${PROJECT_STATUS_CLASS_MAP[project.status]}`}>
                                                    {PROJECT_STATUS_TEXT_MAP[project.status]}
                                                </span>
                                            </td>
                                            <td className='px-3 py-2 text-nowrap'>{project.created_at}</td>
                                            <td className='px-3 py-2 text-nowrap'>{project.due_date}</td>
                                            <td className='px-3 py-2'>{project.createdBy.name}</td>
                                            <td className='px-3 py-2 text-nowrap'>
                                                <Link href={route('project.edit', project)} className='font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1'>Edit</Link>
                                                <button onClick={(e) => handleDeleteProject(project)} className='font-medium text-red-600 dark:text-red-500 hover:underline mx-1'>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <Pagination links={projects.meta.links} />
                    </div>
                </div>
            </div>
        </ AuthenticatedLayout >
    )
}

export default Index