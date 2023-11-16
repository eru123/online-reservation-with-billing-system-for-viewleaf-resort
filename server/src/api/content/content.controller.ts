import { Request, Response } from 'express';
import ContentModel from './content.model';
import { ContentDocument, Shift } from './content.types';

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
        shift: {
          day: {
            start: '6:00 AM',
            end: '4:00 PM',
          },
          night: {
            start: '6:00 PM',
            end: '4:00 AM',
          },
          whole: {
            start: '6:00 AM',
            end: '4:00 AM',
          },
        },
      };
      
      await ContentModel.create(defaultContentData);
    }
  } catch (error) {
    console.error('Error initializing content:', error);
  }
};

export const getContent = async (req: Request, res: Response) => {
  try {
    // Fetch the content document
    const existingContent = await ContentModel.findOne();

    if (!existingContent) {
      initializeContent();
    }

    res.json(existingContent);
  } catch (error) {
    console.error('Error getting content:', error);
    res.status(500).json({ error: 'Internal Server Error' });
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

export const getShifts = async (req: Request, res: Response) => {
  try {
    // Fetch the content document
    const existingContent = await ContentModel.findOne();

    if (!existingContent) {
      initializeContent();
      return res.status(404).json({ error: 'Content not found' });
    }

    // Extract and return only the shift information
    const { shift } = existingContent;
    res.json({ shift });
  } catch (error) {
    console.error('Error getting shifts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const editShifts = async (req: Request<any, any, Partial<Shift>>, res: Response) => {
  try {
    const newShifts: Partial<Shift> = req.body;

    // Ensure there is only one content document
    const existingContent = await ContentModel.findOne();
    if (!existingContent) {
      return res.status(404).json({ error: 'Content not found' });
    }

    // Update the existing content with the new shift data
    existingContent.shift.day = { ...existingContent.shift.day, ...newShifts.day };
    existingContent.shift.night = { ...existingContent.shift.night, ...newShifts.night };
    existingContent.shift.whole = { ...existingContent.shift.whole, ...newShifts.whole };

    const updatedContent = await existingContent.save();

    // Check if the shift property is present in the updated content
    if (!updatedContent || !updatedContent.shift) {
      return res.status(500).json({ error: 'Failed to update shifts' });
    }

    // Check if the shift property is present in the updated content
    if (!updatedContent || !updatedContent.shift) {
      return res.status(500).json({ error: 'Failed to update shifts' });
    }

    res.json(updatedContent.shift);
  } catch (error) {
    console.error('Error editing shifts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

