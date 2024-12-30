import { getProfileController } from '@/lib/controllers/profile.controller';
import { getCurrentSession } from '@/lib/session';
import { redirect } from 'next/navigation';

export const getProfile = async () => {
   try {
      let sessionData = await getCurrentSession();
      if (!sessionData.session) {
         redirect('/login');
      }
      let profileController = await getProfileController(sessionData.session);
      return {
         user: profileController.user,
         company: profileController.company,
      };
   } catch (err) {
      return null;
   }
};
