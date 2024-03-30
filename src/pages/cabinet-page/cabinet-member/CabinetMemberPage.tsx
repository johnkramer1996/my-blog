import React from 'react'
import { memberApi, useBanMemberMutation, useMemberByLoginQuery, useRecoverMemberMutation } from 'entities/member'
import { Link, useParams } from 'react-router-dom'
import { PATH_PAGE, errorHandler, notifySuccess, notifyUnknown } from 'shared/lib'
import { MEMBER_ROLES, MemberRole, useAppSelector } from 'shared/model'
import { Button, Form, Icon, SectionTitle } from 'shared/ui'
import { RadioGroupForm } from 'shared/ui/form/RadioGroupForm'
import { hasPermissionByMember } from 'entities/member'
import { useAttachOrDetachRoleMutation } from 'entities/member/api/member.api'

export const CabinetMemberPage = () => {
  const { login } = useParams() as { login: string }
  const { data: member, isLoading, isSuccess, error } = useMemberByLoginQuery({ login })
  const [AttachOrDetachRole] = useAttachOrDetachRoleMutation()
  const [banFn] = useBanMemberMutation()
  const [recoverFn] = useRecoverMemberMutation()

  const { data: currentMember } = useAppSelector(memberApi.endpoints.currentMember.select())

  if (isLoading) return <div>loading</div>
  if (!isSuccess) return errorHandler(error)

  const onBanToggle = async () => {
    try {
      await (member.isBanned ? recoverFn({ login }).unwrap() : banFn({ login }).unwrap())
      notifySuccess('success')
    } catch (e) {
      notifyUnknown(e)
    }
  }

  const onRoleChange = async (name: string, role: MemberRole, checked: boolean) => {
    try {
      await AttachOrDetachRole({ login, role, action: checked ? 'attach' : 'detach' }).unwrap()
      notifySuccess('success')
    } catch (e) {
      notifyUnknown(e)
    }
  }

  const isOwner = currentMember?.login === login

  return (
    <div>
      <SectionTitle className='mb-30' left>
        {member.login}
      </SectionTitle>

      <div className='image image--circle image--cover image--author image--author-lg ml-auto mr-auto'>
        {member.avatar && <img src={member.avatar} alt='' />}
      </div>

      <Link to={PATH_PAGE.members.member.root(member.login)} className='text-link text-underline'>
        Public profile
        <Icon type='arrow-long-right' right />
      </Link>

      <Form defaultValues={{ roles: member?.roles ?? [] }} className='mt-20'>
        <RadioGroupForm<{ roles: MemberRole[] }, MemberRole>
          label='Roles'
          name='roles'
          type='checkbox'
          options={[
            { label: 'Admin', value: 'admin' },
            { label: 'Editor', value: 'editor' },
            { label: 'Author', value: 'author' },
            { label: 'Contributor', value: 'contributor' },
            { label: 'Subscriber', value: 'subscriber' },
          ]}
          onChange={onRoleChange}
        />
      </Form>
      {hasPermissionByMember([MEMBER_ROLES.admin, MEMBER_ROLES.admin], currentMember) &&
        !isOwner &&
        (member.isBanned ? (
          <Button className='mt-20' onClick={onBanToggle} border maxWidth>
            Recover member
          </Button>
        ) : (
          <Button color='dangerous' className='mt-20' onClick={onBanToggle} border maxWidth>
            Ban member
          </Button>
        ))}
    </div>
  )
}
