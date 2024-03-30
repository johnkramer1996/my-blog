import React from 'react'
import { Button, Pagination, SectionTitle } from 'shared/ui'
import { Comment, CommentList } from 'entities/comment'
import { CreateOrUpdateCommentForm } from 'features/comment/create-or-update-comment'
import { useCommentsQuery } from 'entities/comment'
import { usePaginationQuery } from 'shared/model'
import { memberApi } from 'entities/member'
import { useAppSelector } from 'shared/model'
import { CommentCard, CommentCardState } from 'entities/comment'
import { CommentActions } from 'widgets'
import { useSignInPopup } from 'features/session/sign-in-and-up'
import { Post } from 'entities/post'
import { LIMIT } from 'shared/const'
import { getMemberRole } from 'shared/lib'

type Props = {
  post: Post
  total: number
}

const limit = LIMIT.comments.post

export const CommentsPost = (props: Props) => {
  const { post, total } = props
  const { slug } = post

  const { data: currentMember } = useAppSelector(memberApi.endpoints.currentMember.select())
  const [page, onChangePage] = usePaginationQuery()
  const { data: { data: comments = [], count = 0 } = {}, ...commentsState } = useCommentsQuery({ slug, limit, page })

  const popup = useSignInPopup()
  const onSignIn = () => popup.show()

  const onCompleteReply = (comment: Comment, state: CommentCardState) => {
    state.setIsReplying(false)
    !state.childComments && state.onFindChildrenComment(slug, comment.id)
  }

  const onCompleteCreate = () => {
    onChangePage(1)
  }

  const renderComment = (() => {
    const render = (comment: Comment, parentComment?: Comment) => {
      return (
        <CommentCard
          key={comment.id}
          slug={slug}
          isAuthor={post.member.login === comment.member.login}
          comment={comment}
          currentMember={currentMember}
          actionsSlot={(state) => (
            <CommentActions
              slug={slug}
              comment={comment}
              parentComment={parentComment}
              role={getMemberRole(currentMember, comment.member)}
              onEdit={() => state.setIsEditing((p) => !p)}
              meta={{ page, limit }}
            />
          )}
          createSlot={(state) => (
            <CreateOrUpdateCommentForm type='update' slug={slug} comment={comment} currentMember={currentMember} onComplete={() => state.setIsEditing(false)} />
          )}
          replySlot={(state) =>
            currentMember ? (
              <CreateOrUpdateCommentForm
                type='create'
                slug={slug}
                parentComment={comment}
                currentMember={currentMember}
                onComplete={() => onCompleteReply(comment, state)}
                meta={{ page, limit }}
              />
            ) : (
              <div className='mt-10'>
                <Button onClick={onSignIn}>Sign in</Button>
              </div>
            )
          }
          renderChild={render}
        />
      )
    }
    return render
  })()

  return (
    <section className='section s-comments'>
      <div className='container'>
        <SectionTitle className='mb-30' left>
          {total ? `${total} comments` : 'not commenst yet'}
        </SectionTitle>
        <div className='comments item-bg'>
          <div className='item-bg__bg'></div>
          <CreateOrUpdateCommentForm type='create' slug={slug} currentMember={currentMember} meta={{ page, limit }} onComplete={onCompleteCreate} />

          <CommentList
            slug={slug}
            comments={comments}
            currentMember={currentMember}
            renderComment={renderComment}
            afterSlot={<Pagination onChangePage={onChangePage} count={count} page={page} limit={limit} className='mt-50' />}
            {...commentsState}
          />
        </div>
      </div>
    </section>
  )
}
