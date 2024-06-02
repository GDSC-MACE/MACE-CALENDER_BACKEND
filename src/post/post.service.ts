import {
  ForbiddenException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}
  async createPost(dto: any, id: number) {
    return this.prisma.post.create({
      data: {
        event_name: dto.name,
        description: dto.description,
        userId: id,
      },
    });
  }

  async deletePost(postId: number, userId: number) {
    const post = await this.prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    if (post.userId !== userId) {
      throw new ForbiddenException(
        'You do not have permission to delete this post',
      );
    }

    return this.prisma.post.delete({
      where: { id: postId },
    });
  }

  async fetchAllPosts()
  {
    try{
      const posts=await this.prisma.post.findMany( )
      if(!posts)
      throw new HttpException(
        'no posts available',
        HttpStatus.I_AM_A_TEAPOT,
      );
      return posts
    }
   catch(err)
   {
    throw new HttpException(`error i dont know but server gave :( ${err}`,HttpStatus.AMBIGUOUS)
   }
  }

  async fetchUniquePost(id:number)
  {
    try{
      const posts=await this.prisma.post.findMany( 
        {
          where:{
            userId:id
          }
        }
      )
      if(posts.length==0)
      throw new HttpException(
        'no posts available',
        HttpStatus.I_AM_A_TEAPOT,
      );
      return posts
    }
   catch(err)
   {
    throw new HttpException(`error i dont know but server gave :( ${err}`,HttpStatus.AMBIGUOUS)
   }
  }
}
