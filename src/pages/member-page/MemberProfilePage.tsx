import React from 'react'
import { MemberCard, memberApi, useBanMemberMutation, useMemberByLoginQuery, useRecoverMemberMutation } from 'entities/member'
import { useParams } from 'react-router-dom'
import { PATH_PAGE, notifySuccess, notifyUnknown } from 'shared/lib'
import { MemberRole, errorHandler, useAppSelector } from 'shared/model'
import { Button, Form, SectionTitle } from 'shared/ui'
import { RadioGroupForm } from 'shared/ui/form/RadioGroupForm'
import { hasPermisison } from 'entities/member'
import { useAttachOrDetachRoleMutation } from 'entities/member/api/member.api'

export const MemberProfilePage = () => {
  const { login } = useParams() as { login: string }
  const { data: member, isSuccess, error } = useMemberByLoginQuery({ login })
  const [AttachOrDetachRole] = useAttachOrDetachRoleMutation()
  const [banFn] = useBanMemberMutation()
  const [recoverFn] = useRecoverMemberMutation()

  const { data: currentMember } = useAppSelector(memberApi.endpoints.currentMember.select())

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
      console.log({ checked })
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
        Profile page
      </SectionTitle>

      <MemberCard
        member={member}
        actionsSlot={
          <>
            <Form defaultValues={{ roles: member?.roles ?? [] }}>
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
            {isOwner ? (
              <Button to={PATH_PAGE.cabinet.root} className='mt-10' maxWidth>
                Move to cabinet
              </Button>
            ) : (
              <Button to={PATH_PAGE.cabinet.messages.member(member.login)} className='mt-10' maxWidth>
                Write a message
              </Button>
            )}
            {hasPermisison(currentMember, ['admin', 'editor']) &&
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
          </>
        }
      />
    </div>
  )
}
