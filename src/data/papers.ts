
import { Paper } from '../types';

export const papers: Paper[] = [
  {
    id: '1',
    title: 'Vision Transformer for Small-Size Datasets',
    authors: [
      { id: '1', name: 'Kai Han', institution: 'University of Oxford' },
      { id: '2', name: 'Yunhe Wang', institution: 'Huawei Noah\'s Ark Lab' },
      { id: '3', name: 'Jianyuan Guo', institution: 'Peking University' }
    ],
    abstract: 'Vision Transformer (ViT) has achieved remarkable success in computer vision tasks. However, its performance heavily depends on sufficient data for training. When the training dataset is small, ViT often underperforms compared to CNNs due to the lack of inductive bias. This paper presents a new architecture that adapts Vision Transformers for small-size datasets.',
    publishDate: '2023-10-15',
    conference: 'CVPR',
    citations: 145,
    tags: ['vision transformer', 'small datasets', 'transfer learning'],
    url: 'https://example.com/paper1',
    imageUrl: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=500&h=300'
  },
  {
    id: '2',
    title: 'Real-time Object Detection with Sparse Attention',
    authors: [
      { id: '4', name: 'Jingdong Wang', institution: 'Microsoft Research' },
      { id: '5', name: 'Ke Sun', institution: 'Tsinghua University' }
    ],
    abstract: 'Object detection in real-time remains a challenging task, especially on resource-constrained devices. We propose a novel approach using sparse attention mechanisms to significantly reduce computational complexity while maintaining high detection accuracy.',
    publishDate: '2023-09-18',
    conference: 'ICCV',
    citations: 89,
    tags: ['object detection', 'real-time', 'sparse attention'],
    url: 'https://example.com/paper2',
    imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=500&h=300'
  },
  {
    id: '3',
    title: 'Self-Supervised Learning for Medical Image Segmentation',
    authors: [
      { id: '6', name: 'Emma Johnson', institution: 'Stanford University' },
      { id: '7', name: 'Michael Zhang', institution: 'MIT' }
    ],
    abstract: 'Medical image segmentation often suffers from limited labeled data. We introduce a self-supervised pre-training approach that leverages large amounts of unlabeled medical images to improve segmentation accuracy on downstream tasks with limited supervision.',
    publishDate: '2023-08-05',
    journal: 'Medical Image Analysis',
    citations: 112,
    tags: ['medical imaging', 'segmentation', 'self-supervised learning'],
    url: 'https://example.com/paper3',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=500&h=300'
  },
  {
    id: '4',
    title: 'Contrastive Learning of Visual Representations',
    authors: [
      { id: '8', name: 'Chen Sun', institution: 'Google Research' },
      { id: '9', name: 'Abhinav Gupta', institution: 'Carnegie Mellon University' }
    ],
    abstract: 'We present a contrastive approach for self-supervised learning of visual representations. Our framework maximizes agreement between differently augmented views of the same image via a contrastive loss in the latent space, resulting in representations that outperform supervised pre-training on many downstream tasks.',
    publishDate: '2023-07-20',
    conference: 'NeurIPS',
    citations: 320,
    tags: ['contrastive learning', 'self-supervised', 'representation learning'],
    url: 'https://example.com/paper4',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=500&h=300'
  },
  {
    id: '5',
    title: '3D Scene Understanding with Neural Implicit Representations',
    authors: [
      { id: '10', name: 'Sarah Parker', institution: 'ETH Zurich' },
      { id: '11', name: 'Alex Rodriguez', institution: 'UC Berkeley' }
    ],
    abstract: 'Neural implicit representations have emerged as a powerful paradigm for 3D scene reconstruction and understanding. We propose a novel architecture that efficiently learns continuous implicit fields from sparse observations, enabling high-quality 3D reconstruction and semantic understanding of complex scenes.',
    publishDate: '2023-11-02',
    conference: 'ECCV',
    citations: 76,
    tags: ['3D reconstruction', 'neural implicit fields', 'scene understanding'],
    url: 'https://example.com/paper5',
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=500&h=300'
  }
];

export const filterCategories = [
  {
    id: 'conference',
    name: 'Conference',
    options: [
      { id: 'cvpr', label: 'CVPR' },
      { id: 'iccv', label: 'ICCV' },
      { id: 'eccv', label: 'ECCV' },
      { id: 'neurips', label: 'NeurIPS' },
    ]
  },
  {
    id: 'year',
    name: 'Year',
    options: [
      { id: '2023', label: '2023' },
      { id: '2022', label: '2022' },
      { id: '2021', label: '2021' },
    ]
  },
  {
    id: 'topic',
    name: 'Topic',
    options: [
      { id: 'transformers', label: 'Transformers' },
      { id: 'object-detection', label: 'Object Detection' },
      { id: 'segmentation', label: 'Segmentation' },
      { id: 'self-supervised', label: 'Self-Supervised Learning' },
      { id: '3d', label: '3D Vision' },
    ]
  }
];
