import { DocumentNode, gql, useQuery } from '@apollo/client';
import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router';
import { useSearchParams } from './MenuBar';
import { Spinner } from './Spinner';
import { useCRUD, useDocumentNodes } from "../hooks/useCRUD";
import { useRequireAuth } from './useRequireAuth';
import { getProp } from './setProp';
import { Field } from './Field';
import { ColDef } from './useGraphQL-old';

export function getParentNode(current: HTMLElement | null, tag: string): HTMLElement | null {
    if (current == null) return null;
    if (current.tagName === tag.toUpperCase()) {
        return current;
    }
    return getParentNode(current.parentElement, tag);
}
export function Grid<T extends { _id: string } & Record<string, any>>() {
    const navigate = useNavigate();
    useRequireAuth();
    // const { selectAll, headers, allColumns, resultPlural } = useGraphQL();
    const { allColumns, selectAll } = useDocumentNodes();
    const [selected, appendSelected, overwriteSelected, deleteSelected, isSelected] = useSearchParams(true);
    const { data, loading, error } = useQuery<{ grid: T[] }, undefined>(selectAll as DocumentNode, { fetchPolicy: 'network-only', nextFetchPolicy: 'cache-and-network' });
    const onClick = useCallback((ev: React.MouseEvent<HTMLTableRowElement>) => {
        const target = getParentNode(ev.target as HTMLElement, 'TR');
        if (target == null) throw new Error('parent not found');
        const id = target.dataset.id ?? '';
        if (ev.ctrlKey || ev.shiftKey) {
            if (isSelected(id)) {
                return deleteSelected(id);
            }
            return appendSelected(id);
        }
        if (isSelected(id)) {
            return deleteSelected(id);
        }
        return overwriteSelected(id);
    }, [appendSelected, deleteSelected, isSelected, overwriteSelected]);
    const onDoubleClick = useCallback((ev: React.MouseEvent<HTMLElement>) => {
        const target = getParentNode(ev.target as HTMLElement, 'TR');
        if (target == null) throw new Error('parent node not found');
        const id = target.dataset.id ?? '';
        navigate(id);
    }, [navigate]);

    return (
        <div className='w-full h-full px-3 py-2 mx-auto overflow-auto'>
            {loading && <Spinner />}
            {!loading && (
                <table className='w-full h-auto table-auto'>
                    <thead>
                        <tr>
                            {(allColumns as ColDef[]).map(x => x.header).map((x, ix) => (
                                <th
                                    key={ix}
                                    scope='col'
                                    className='text-lg font-bold leading-loose tracking-wide text-white bg-indigo font-fira-sans'
                                >
                                    {x}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {(data != null ? data.grid ?? [] : []).map((x, ix) => {
                            return (
                                <tr
                                    key={x._id}
                                    data-id={x._id}
                                    className={`even:bg-white odd:bg-cyan-light text-black font-fira-sans font-normal text-base ${
                                        isSelected(x._id) ? `selected` : ``
                                    }`}
                                    onClick={onClick}
                                    onDoubleClick={onDoubleClick}
                                >
                                    {(allColumns as ColDef[]).map((y, ix2) => {
                                        console.log(y.property);
                                        return <td key={ix2}>{getProp(y.property)(x)}</td>;
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}
        </div>
    );
}


