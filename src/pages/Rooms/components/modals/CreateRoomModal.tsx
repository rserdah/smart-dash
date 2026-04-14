/** @jsxImportSource @emotion/react */
import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { ModalHeader, ModalBody, ModalFooter, ModalFooterBtn, ModalShell } from '@/modals/ModalShell';


const _______ = styled.div`
`;

export default function CreateRoomModal({ room, onClose }: any) {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

    const onSubmit = useCallback(async () => {
        await new Promise(res => setTimeout(res, 5000));

        typeof onClose === 'function' && onClose();
    }, []);

    return (
        <ModalShell onClose={onClose} open>
            <ModalHeader>Hello</ModalHeader>

            <ModalBody>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div>
                        <label>Test</label>
                        <input
                            {...register('name', { required: 'Name is required' })}
                            type='text'
                        />
                        {errors.name && <span><>{errors.name.message}</></span>}
                    </div>

                    <div>
                        <label>Device Type</label>
                        <select
                            {...register('deviceType', { required: 'Device type is required' })}
                        >
                            <option value=''></option>
                            <option value='light'>Light</option>
                            <option value='thermostat'>Thermostat</option>
                            <option value='switch'>Switch</option>
                        </select>
                        {errors.deviceType && <span><>{errors.deviceType.message}</></span>}
                    </div>
                </form>
            </ModalBody>

            <ModalFooter>
                <ModalFooterBtn onClick={() => { onClose?.(); }}>Cancel</ModalFooterBtn>
                <ModalFooterBtn onClick={handleSubmit(onSubmit)} disabled={isSubmitting} /* css={css`background: red;`} */ type='submit'>
                    {isSubmitting ? 'Creating...' : 'Create'}
                </ModalFooterBtn>
            </ModalFooter>
        </ModalShell>
    )
}
