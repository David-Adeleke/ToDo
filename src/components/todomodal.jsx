import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
  } from '@/components/ui/dialog';
  import { Button } from '@/components/ui/button';
  import { useState, useEffect } from 'react';
  
  export default function TodoModal({
    open,
    onClose,
    onSubmit,
    defaultValue = null,
    loading,
  }) {
    const [title, setTitle] = useState('');
  
    useEffect(() => {
      if (defaultValue) {
        setTitle(defaultValue.name || '')
      } else {
        setTitle('')
      }
    }, [defaultValue, open]);
  
    const handleSubmit = () => {
      if (!title.trim()) return;
      onSubmit({name : title});
    };
  
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {defaultValue ? 'Edit Todo' : 'Create Todo'}
            </DialogTitle>
          </DialogHeader>
  
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded px-3 py-2 mt-2"
            placeholder="Enter todo title"
          />
  
          <DialogFooter className="mt-4">
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? 'Saving...' : 'Save'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
  