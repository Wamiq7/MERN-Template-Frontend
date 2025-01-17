import { useQuery } from "@tanstack/react-query";
import { postRepository } from "../repositories/post.repository";

export const postService = {
  useGetPostList: () => {
    return useQuery({
      queryKey: ["getPostList"],
      queryFn: postRepository.getPostList,
    });
  },
  useGetPostDetail: (postId: string) => {
    return useQuery({
      queryKey: ["getPostDetail", postId],
      queryFn: () => postRepository.getPostDetail(postId),
    });
  },
};
