import { Request, Response } from 'express';
import ContentModel from './content.model';
import { ContentDocument, Shift, Fee } from './content.types';

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
        fee: {
          kid: {
            day: 0,
            night: 0,
            whole: 0,
          },
          adult: {
            day: 0,
            night: 0,
            whole: 0,
          },
          senior: {
            day: 0,
            night: 0,
            whole: 0,
          },
          pwd: {
            day: 0,
            night: 0,
            whole: 0,
          }
        }
      }
      await ContentModel.create(defaultContentData);
    }
  } catch (error) {
    console.error('Error initializing content:', error);
  }
};

export const getContent = async (_req: Request, res: Response) => {
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

export const getShifts = async (_req: Request, res: Response) => {
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

export const getFees = async (_req: Request, res: Response) => {
  try {
    // Fetch the content document
    const existingContent = await ContentModel.findOne();

    if (!existingContent) {
      initializeContent();
      return res.status(404).json({ error: 'Content not found' });
    }

    // Extract and return only the fee information
    const { fee } = existingContent;
    res.json({ fee });
  } catch (error) {
    console.error('Error getting fees:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const editFees = async (req: Request<any, any, Partial<Fee>>, res: Response) => {
  try {
    const newFees: Partial<Fee> = req.body;

    // Ensure there is only one content document
    const existingContent = await ContentModel.findOne();
    if (!existingContent) {
      return res.status(404).json({ error: 'Content not found' });
    }

    // Update the existing content with the new fee data
    updateFee(existingContent, newFees);

    const updatedContent = await existingContent.save();

    // Check if the fee property is present in the updated content
    if (!updatedContent || !updatedContent.fee) {
      return res.status(500).json({ error: 'Failed to update fees' });
    }

    res.json(updatedContent.fee);
  } catch (error) {
    console.error('Error editing fees:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Helper function to update fees
const updateFee = (content: ContentDocument, newFees: Partial<Fee>) => {
  content.fee.kid.day = newFees.kid?.day ?? content.fee.kid.day;
  content.fee.kid.night = newFees.kid?.night ?? content.fee.kid.night;
  content.fee.kid.whole = newFees.kid?.whole ?? content.fee.kid.whole;

  content.fee.adult.day = newFees.adult?.day ?? content.fee.adult.day;
  content.fee.adult.night = newFees.adult?.night ?? content.fee.adult.night;
  content.fee.adult.whole = newFees.adult?.whole ?? content.fee.adult.whole;

  content.fee.senior.day = newFees.senior?.day ?? content.fee.senior.day;
  content.fee.senior.night = newFees.senior?.night ?? content.fee.senior.night;
  content.fee.senior.whole = newFees.senior?.whole ?? content.fee.senior.whole;

  content.fee.pwd.day = newFees.pwd?.day ?? content.fee.pwd.day;
  content.fee.pwd.night = newFees.pwd?.night ?? content.fee.pwd.night;
  content.fee.pwd.whole = newFees.pwd?.whole ?? content.fee.pwd.whole;
  
};

