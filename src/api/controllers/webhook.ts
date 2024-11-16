import express from 'express'

const router = express.Router()

type WebhookResponse = string[]

router.get<{}, WebhookResponse>('/', async (req, res) => {
    res.json(['😀', '😳', '🙄'])
})
//  try {
//             let repoToUpdate = await githubAPIHelper.getSingleRepo(
//                req.body.repository.name
//             );
//             let requestData = req.body.repository;

//             let repo = {
//                id: repoToUpdate.id,
//                name: requestData.name,
//                openGraphImageUrl: repoToUpdate.openGraphImageUrl,
//                description: requestData.description,
//                homepage: requestData.homepageUrl || requestData.homepage,
//                url: requestData.html_url,
//             };
//             let updatedRepo = await models.repos.updateRepo(repo);
//             res.send('Success!!!');
//          } catch (err) {
//             res.status(400).send(err);
//          }

import { Webhooks } from '@octokit/webhooks'

const webhooks = new Webhooks({
    secret: process.env.WEBHOOK_SECRET
})

const handleWebhook = async (req, res) => {
    const signature = req.headers['x-hub-signature-256']
    const body = await req.text()

    if (!(await webhooks.verify(body, signature))) {
        res.status(401).send('Unauthorized')
        return
    }

    // The rest of your logic here
}

export default router
