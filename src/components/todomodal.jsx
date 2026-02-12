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
    setOpen,
    onSubmit,
    defaultValue = '',
    loading,
  }) {
    const [title, setTitle] = useState('');
  
    useEffect(() => {
      setTitle(defaultValue);
    }, [defaultValue]);
  
    const handleSubmit = () => {
      if (!title.trim()) return;
      onSubmit(title);
    };
  
    return (
      <Dialog open={open} onOpenChange={setOpen}>
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
  