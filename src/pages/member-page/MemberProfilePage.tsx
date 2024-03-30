import React from 'react'
import { MemberCard, memberApi, useBanMemberMutation, useMemberByLoginQuery, useRecoverMemberMutation } from 'entities/member'
import { useParams } from 'react-router-dom'
import { PATH_PAGE, errorHandler, notifySuccess, notifyUnknown } from 'shared/lib'
import { MEMBER_ROLES, useAppSelector } from 'shared/model'
import { Button, SectionTitle } from 'shared/ui'
import { hasPermissionByMember } from 'entities/member'
import { useAttachOrDetachRoleMutation } from 'entities/member/api/member.api'

export const MemberProfilePage = () => {
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
            {isOwner ? (
              <Button to={PATH_PAGE.cabinet.root} className='mt-10' maxWidth>
                Move to cabinet
              </Button>
            ) : (
              <Button to={PATH_PAGE.cabinet.messages.member(member.login)} className='mt-10' maxWidth>
                Write a message
              </Button>
            )}
            {hasPermissionByMember([MEMBER_ROLES.admin, MEMBER_ROLES.editor], currentMember) &&
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
