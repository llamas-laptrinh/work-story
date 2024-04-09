use anchor_lang::prelude::*;
use anchor_lang::solana_program::log::sol_log_compute_units;
use anchor_spl::token::{self, Token};
use solana_program::entrypoint::ProgramResult;
use std::mem::size_of;

// This is your program's public key and it will update
// automatically when you build the project.
declare_id!("27sYq8yqDSBQSxXyUBSBc6zGDs954Xbtqq77GskjBUBD");

const TEXT_LENGTH: usize = 1024;
// Username length
const USER_NAME_LENGTH: usize = 100;
// User profile image url length
const USER_URL_LENGTH: usize = 255;
const WORK_URL_LENGTH: usize = 255;

const NUMBER_OF_ALLOWED_LIKES_SPACE: usize = 5;
const NUMBER_OF_ALLOWED_LIKES: u8 = 5;

#[program]
mod work_story {
    use super::*;
    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        // ctx.accounts.new_account.xp_point = data;
        msg!("Changed data to: {}!"); // Message will show up in the tx logs
        Ok(())
    }
    pub fn create_user(
        ctx: Context<CreateUser>,
        user_name: String,
        bio: String,
        user_profile_image_url: String,
    ) -> ProgramResult {
        let user = &mut ctx.accounts.user;
        user.xp_point = 0;
        user.user_name = user_name;
        user.bio = bio;
        user.user_wallet_address = ctx.accounts.signer.key();
        user.user_profile_image_url = user_profile_image_url;
        user.tokens = 0;
        sol_log_compute_units();
        Ok(())
    }
    pub fn create_work(
        ctx: Context<CreateWork>,
        name: String,
        create_by: String,
        image_url: String,
        work_url: String,
        description: String,
        category_id: u64,
    ) -> ProgramResult {
        let work = &mut ctx.accounts.work;

        work.authority = ctx.accounts.signer.key();
        work.name = name;
        work.create_by = create_by;
        work.image_url = image_url;
        work.work_url = work_url;
        work.description = description;
        work.comment_count = 0;
        work.category_id = category_id;
        work.created_at = ctx.accounts.create_at.unix_timestamp;
        sol_log_compute_units();
        Ok(())
    }
    pub fn create_dao(ctx: Context<CreateDAO>) -> ProgramResult {
        sol_log_compute_units();
        Ok(())
    }

}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(
        init,
        seeds = [b"state".as_ref()],
        bump,
        payer = signer,
        space = size_of::<GlobalStateAccount>() + 8
    )]
    pub state: Account<'info, GlobalStateAccount>,

    #[account(mut)]
    pub signer: Signer<'info>,

    pub system_program: UncheckedAccount<'info>,

    #[account(constraint = token_program.key == &token::ID)]
    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct Approve<'info> {
    #[account(mut)]
    pub work: Account<'info, ProofOfWorkAccount>,
}

#[derive(Accounts)]
pub struct DisApprove<'info> {
    #[account(mut)]
    pub work: Account<'info, ProofOfWorkAccount>,
}

#[derive(Accounts)]
pub struct CreateUser<'info> {
    #[account(
        init,
        // User account use string "user" and index of user as seeds
        seeds = [b"user".as_ref(), signer.key().as_ref()],
        bump,
        payer = signer,
        space = size_of::<UserAccount>() + USER_NAME_LENGTH + WORK_URL_LENGTH + 8
    )]
    pub user: Account<'info, UserAccount>,

    #[account(mut)]
    pub signer: Signer<'info>,

    pub system_program: UncheckedAccount<'info>,

    // Token program
    #[account(constraint = token_program.key == &token::ID)]
    pub token_program: Program<'info, Token>,

    pub created_at: Sysvar<'info, Clock>,
}

#[derive(Accounts)]
pub struct CreateWork<'info> {
    #[account(mut, seeds = [b"state".as_ref()], bump)]
    pub state: Account<'info, GlobalStateAccount>,
    #[account(
        init,
        // Video account use string "video" and index of video as seeds
        seeds = [b"work".as_ref(), state.total_work.to_be_bytes().as_ref()],
        bump,
        payer = signer,
        space = size_of::<ProofOfWorkAccount>() + TEXT_LENGTH + USER_NAME_LENGTH + USER_URL_LENGTH+WORK_URL_LENGTH+8+32*NUMBER_OF_ALLOWED_LIKES_SPACE
    )]
    pub work: Account<'info, ProofOfWorkAccount>,

    // Authority (this is signer who paid transaction fee)
    #[account(mut)]
    pub signer: Signer<'info>,

    pub system_program: UncheckedAccount<'info>,

    // Token program
    #[account(constraint = token_program.key == &token::ID)]
    pub token_program: Program<'info, Token>,

    pub create_at: Sysvar<'info, Clock>,
}

#[derive(Accounts)]
pub struct CreateDAO<'info> {
    pub created_at: Sysvar<'info, Clock>,
}

#[account]
pub struct GlobalStateAccount {
    pub total_dao: u64,
    pub total_work: u64,
    pub total_member: u64,
}

#[account]
pub struct VerifyWorkProposalAccount {
    pub title: String,
    pub description: String,
    pub votes_for: u64,
    pub votes_against: u64,
}

#[account]
pub struct DAOAccount {
    pub treasury: u64,
    pub proposals: Vec<ProofOfWorkAccount>,
    pub members: Vec<UserAccount>,
}

#[account]
pub struct UserAccount {
    pub xp_point: u64,
    pub user_name: String,
    pub bio: String,
    pub user_wallet_address: Pubkey,
    pub user_profile_image_url: String,

    pub tokens: u64,
}
#[account]
pub struct ProofOfWorkAccount {
    pub authority: Pubkey,
    pub name: String,
    pub create_by: String,
    pub image_url: String,
    pub work_url: String,
    pub description: String,
    pub comment_count: u64,
    pub category_id: u64,
    pub people_who_liked: Vec<Pubkey>,
    pub created_at: i64,
}

#[account]
pub struct CommentAccount {
    // Signer address
    pub authority: Pubkey,
    pub text: String,
    pub commenter_name: String,
    pub commenter_url: String,
    pub index: u64,
}

// #[error]
// pub enum Errors {
//     #[msg("User cannot be created, missing data")]
//     CannotCreateUser,

//     #[msg("Video cannot be created, missing data")]
//     CannotCreateVideo,

//     #[msg("Cannot receive more than 5 likes")]
//     ReachedMaxLikes,

//     #[msg("User has already liked the tweet")]
//     UserLikedVideo,

//     #[msg("Video with potentially bad content")]
//     UserCensoredVideo,
// }
