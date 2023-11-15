import { Request, Response } from 'express';
import ContentModel from './content.model';
import { ContentDocument } from './content.types';

export const initializeContent = async () => {
  try {
    const existingContent = await ContentModel.findOne();

    if (!existingContent) {
      const defaultContentData = {
        about: 'Default About Value',
        phone: 1234567890,
        email: 'default@example.com',
        address: 'Default Address Value',
        policy: 'Default Policy Value',
        payment: 'Default Payment Value',
        promo: 'Default Promo Value',
      };
      
      await ContentModel.create(defaultContentData);
    }
  } catch (error) {
    console.error('Error initializing content:', error);
  }
};

export const editContent = async (req: Request<any, any, Partial<ContentDocument>>, res: Response) => {
  try {
    const newData = req.body;

    // Ensure there is only one content document
    const existingContent = await ContentModel.findOne();
    if (!existingContent) {
      return res.status(404).json({ error: 'Content not found' });
    }

    // Check if there is any provided data in the request
    if (Object.keys(newData).length === 0) {
      return res.status(400).json({ error: 'No data provided for update' });
    }

    // Update the existing content with the new data
    const updatedContent = await ContentModel.findByIdAndUpdate(
      existingContent._id,
      { $set: newData },
      { new: true }
    );

    res.json(updatedContent);
  } catch (error) {
    console.error('Error editing content:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};